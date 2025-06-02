package dev.renting.delegations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.enhanced.dynamodb.*;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;
import software.amazon.awssdk.enhanced.dynamodb.model.ScanEnhancedRequest;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Repository
public class DelegationRepositoryImpl implements DelegationRepository {

    private final DynamoDbEnhancedClient enhancedClient;
    private final String tableName = "Delegations";

    @Autowired
    public DelegationRepositoryImpl(DynamoDbEnhancedClient enhancedClient) {
        this.enhancedClient = enhancedClient;
    }

    @Override
    public <T> void save(T item) {
        DynamoDbTable<T> table =
                enhancedClient.table(
                        tableName,
                        TableSchema.fromBean((Class<T>) item.getClass()));
        table.putItem(item);
    }

    @Override
    public <T> T get(String partitionKey, String sortKey, Class<T> clazz) {
        DynamoDbTable<T> table = enhancedClient.table(tableName, TableSchema.fromBean(clazz));
        Key key = Key.builder()
                .partitionValue(partitionKey)
                .sortValue(sortKey)
                .build();
        return table.getItem(key);
    }

    @Override
    public <T> List<T> listByPartitionKey(String partitionKey, Class<T> clazz) {
        DynamoDbTable<T> table = enhancedClient.table(tableName, TableSchema.fromBean(clazz));
        QueryConditional queryConditional = QueryConditional.keyEqualTo(k -> k.partitionValue(partitionKey));
        List<T> items = new ArrayList<>();
        table.query(queryConditional).items().forEach(items::add);
        return items;
    }

   /* @Override
    public List<Car> listAllCars() {
        DynamoDbTable<Car> table = enhancedClient.table(tableName, TableSchema.fromBean(Car.class));
        List<Car> cars = new ArrayList<>();
        // You can add a filterExpression if you want only items of type Car
        table.scan(ScanEnhancedRequest.builder().build()).items().forEach(cars::add);
        return cars;
    }*/


    @Override
    public List<Car> listAllCars() {
        // Create a DynamoDB table object for the Car class, mapping to the "Delegations" table
        DynamoDbTable<Car> table = enhancedClient.table(tableName, TableSchema.fromBean(Car.class));
        // Initialize an empty ArrayList to store the retrieved Car objects
        List<Car> cars = new ArrayList<>();
        // Create a HashMap to store expression values for the filter expression
        Map<String, AttributeValue> expressionValues = new HashMap<>();
        // Add a key-value pair to the map, where ":val" is the placeholder for the string "car"
        expressionValues.put(":val", AttributeValue.builder().s("car").build());
        // Build a filter expression to match items where the "operation" sort key begins with "car"
        Expression filterExpression = Expression.builder()
                .expression("begins_with(operation, :val)") // Define the expression using the begins_with function
                .expressionValues(expressionValues) // Associate the expression values map
                .build(); // Construct the Expression object
        // Build a ScanEnhancedRequest with the filter expression to limit results to Car items
        ScanEnhancedRequest scanRequest = ScanEnhancedRequest.builder()
                .filterExpression(filterExpression) // Apply the filter expression to the scan
                .build(); // Construct the ScanEnhancedRequest object
        // Execute the scan operation and iterate over the results, adding each Car item to the cars list
        table.scan(scanRequest).items().forEach(cars::add);
        // Return the list of Car objects
        return cars;
    }

    @Override
    public List<Delegation> listAllDelegations() {
        DynamoDbTable<Delegation> table = enhancedClient.table(tableName, TableSchema.fromBean(Delegation.class));
        List<Delegation> delegations = new ArrayList<>();
        Map<String, AttributeValue> expressionValues = new HashMap<>();
        expressionValues.put(":val", AttributeValue.builder().s("profile").build());
        Expression filterExpression = Expression.builder()
                .expression("operation = :val")
                .expressionValues(expressionValues)
                .build();
        ScanEnhancedRequest scanRequest = ScanEnhancedRequest.builder()
                .filterExpression(filterExpression)
                .build();
        table.scan(scanRequest).items().forEach(delegations::add);
        return delegations;
    }

    @Override
    public <T> List<T> listAllItems(Class<T> clazz) {
        DynamoDbTable<T> table = enhancedClient.table(tableName, TableSchema.fromBean(clazz));
        List<T> items = new ArrayList<>();
        table.scan(ScanEnhancedRequest.builder().build()).items().forEach(items::add);
        return items;
    }

    @Override
    public List<Car> listAllCarsByDelegation(String delegationId) {
        DynamoDbTable<Car> table = enhancedClient.table(tableName, TableSchema.fromBean(Car.class));
        Map<String, AttributeValue> expressionValues = new HashMap<>();
        expressionValues.put(":prefix", AttributeValue.builder().s("car").build());
        expressionValues.put(":delegation", AttributeValue.builder().s(delegationId).build());
        Expression filterExpression = Expression.builder()
                .expression("begins_with(operation, :prefix) AND delegationId = :delegation")
                .expressionValues(expressionValues)
                .build();
        ScanEnhancedRequest scanRequest = ScanEnhancedRequest.builder()
                .filterExpression(filterExpression)
                .build();
        return table.scan(scanRequest)
                .items()
                .stream()
                .collect(Collectors.toList());
    }

    @Override
    public List<Car> listCarsByDelegationAndDate(String delegationId, String startDate, String endDate) {
        // Defensive: check for null or empty input
        if (delegationId == null || startDate == null || endDate == null) {
            System.err.println("Null input in listCarsByDelegationAndDate: " + delegationId + ", " + startDate + ", " + endDate);
            return Collections.emptyList();
        }

        // Convert ISO date (yyyy-MM-dd) to expected format (yyyy/MM/dd) if needed
        String formattedStartDate = convertToSlashDate(startDate);
        String formattedEndDate = convertToSlashDate(endDate);

        List<String> requiredDates;
        try {
            requiredDates = generateDateRange(formattedStartDate, formattedEndDate);
        } catch (Exception e) {
            System.err.println("Error parsing dates: " + formattedStartDate + ", " + formattedEndDate);
            e.printStackTrace();
            return Collections.emptyList();
        }
        if (requiredDates.isEmpty()) {
            System.err.println("No dates generated for range: " + formattedStartDate + " to " + formattedEndDate);
            return Collections.emptyList();
        }

        DynamoDbTable<Car> table = enhancedClient.table(tableName, TableSchema.fromBean(Car.class));
        Map<String, AttributeValue> expressionValues = new HashMap<>();
        expressionValues.put(":prefix", AttributeValue.builder().s("car").build());
        expressionValues.put(":delegation", AttributeValue.builder().s(delegationId).build());
        Expression filterExpression = Expression.builder()
                .expression("begins_with(operation, :prefix) AND delegationId = :delegation")
                .expressionValues(expressionValues)
                .build();
        ScanEnhancedRequest scanRequest = ScanEnhancedRequest.builder()
                .filterExpression(filterExpression)
                .build();

        List<Car> cars = table.scan(scanRequest)
                .items()
                .stream()
                .collect(Collectors.toList());

        List<Car> availableCars = new ArrayList<>();
        for (Car car : cars) {
            List<String> carDates = car.getAvailableDates();
            if (carDates == null) {
                System.err.println("Car with null availableDates: " + car.getOperation());
                continue;
            }
            // Defensive: filter out non-string or malformed dates
            List<String> validDates = carDates.stream()
                    .filter(Objects::nonNull)
                    .filter(d -> d.matches("\\d{4}/\\d{2}/\\d{2}"))
                    .collect(Collectors.toList());
            if (validDates.size() != carDates.size()) {
                System.err.println("Car with malformed dates: " + car.getOperation() + " " + carDates);
            }
            Set<String> carDateSet = new HashSet<>(validDates);
            if (carDateSet.containsAll(requiredDates)) {
                availableCars.add(car);
            }
        }
        return availableCars;
    }

    @Override
    public void deleteDatesFromCar(Car car, String startDate, String endDate) {
        if (car == null || startDate == null || endDate == null) return;

        String formattedStartDate = convertToSlashDate(startDate);
        String formattedEndDate = convertToSlashDate(endDate);

        List<String> datesToRemove;
        try {
            datesToRemove = generateDateRange(formattedStartDate, formattedEndDate);
        } catch (Exception e) {
            System.err.println("Error parsing dates for deletion: " + formattedStartDate + ", " + formattedEndDate);
            e.printStackTrace();
            return;
        }

        List<String> availableDates = car.getAvailableDates();
        if (availableDates == null) return;

        availableDates.removeAll(datesToRemove);
        car.setAvailableDates(availableDates);

        save(car);
    }

    // Converts yyyy-MM-dd to yyyy/MM/dd, or returns input if already in correct format
    private String convertToSlashDate(String date) {
        if (date == null) return null;
        if (date.contains("/")) return date;
        if (date.matches("\\d{4}-\\d{2}-\\d{2}")) {
            return date.replace("-", "/");
        }
        return date;
    }

    private List<String> generateDateRange(String startDateStr, String endDateStr) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        LocalDate start = LocalDate.parse(startDateStr, formatter);
        LocalDate end = LocalDate.parse(endDateStr, formatter);

        List<String> dates = new ArrayList<>();
        LocalDate current = start;
        while (!current.isAfter(end)) {
            dates.add(current.format(formatter));
            current = current.plusDays(1);
        }
        return dates;
    }



}
