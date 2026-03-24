package org.example.service;

import org.example.model.dto.Employee;
import org.example.model.entity.EmployeeEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.repository.EmployeeRepo;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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

    public List<Employee> getAll() {
        List<EmployeeEntity> all = employeeRepo.findAll();
        List<Employee> employees = new ArrayList<>();

        for (EmployeeEntity employeeEntity : all) {
            employees.add(new Employee(

            ));
        }

        return employees;
    }
}
//private int id;
//private String name;
//private LocalDate date;
//private LocalDate arrivalTime;
//private LocalDate leaveTime;