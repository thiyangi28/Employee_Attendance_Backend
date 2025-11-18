package service;

import model.dto.Employee;
import model.entity.EmployeeEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.EmployeeRepo;

import java.time.LocalDate;
@Service
public class EmployeeService {

    @Autowired
    EmployeeRepo employeeRepo;
    public void punch(Employee employee) {
        employeeRepo.save(new EmployeeEntity(
               employee.getId(),
               employee.getName(),
               employee.getDate(),
               employee.getArrivalTime(),
               employee.getLeaveTime()
        ));
    }
}

//private int id;
//private String name;
//private LocalDate date;
//private LocalDate arrivalTime;
//private LocalDate leaveTime;