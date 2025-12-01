package org.example.controller;
import org.example.model.dto.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.example.service.EmployeeService;

import java.util.List;

@RestController
@RequestMapping("attendance")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @PostMapping("/punch")
    public  void addAttendance(@RequestBody Employee employee){
        employeeService.punch(employee);

    }
    @GetMapping("/all")
    public List<Employee> showAll(){
        return employeeService.getAll();

    }

}
