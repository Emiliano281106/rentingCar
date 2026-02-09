package dev.renting.repairs;

import java.util.List;

public interface RepairRepository {

    <T> void save(T item);

    <T> T get(String partitionKey, String sortKey, Class<T> clazz);

    <T> List<T> listByPartitionKey(String partitionKey, Class<T> clazz);

    List<Car> listAllCars();

    List<Repair> listAllRepairs();

    <T> List<T> listAllItems(Class<T> clazz);
}
