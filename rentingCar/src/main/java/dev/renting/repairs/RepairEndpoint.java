package dev.renting.repairs;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Endpoint
@AnonymousAllowed
public class RepairEndpoint {

    private final RepairRepository repairRepository;

    @Autowired
    public RepairEndpoint(RepairRepository repairRepository) {
        this.repairRepository = repairRepository;
    }

    // Save Delegation
    public void saveRepair(Repair repair) {
        repairRepository.save(repair);
    }

    // Save Car
    public void saveCar(Car car) {
        repairRepository.save(car);
    }

    // Get Delegation by keys
    public Repair getRepair(String repairId, String operation) {
        return repairRepository.get(repairId, operation, Repair.class);
    }

    // Get Car by keys
    public Car getCar(String id, String operation) {
        return repairRepository.get(id, operation, Car.class);
    }

    // List Delegations by delegationId
    public List<Repair> listRepairsById(String repairId) {
        return repairRepository.listByPartitionKey(repairId, Repair.class);
    }

    // List Cars by id (partition key)
    public List<Car> listCarsById(String id) {
        return repairRepository.listByPartitionKey(id, Car.class);
    }

    // List all cars for all delegations
    public List<Car> getAllCars() {
        return repairRepository.listAllCars();
    }

    // List all delegations with operation = "profile"
    public List<Repair> getAllProfileRepairs() {
        // Adjust the repository call as needed for your DB/ORM
        return repairRepository.listAllRepairs();
    }

}
