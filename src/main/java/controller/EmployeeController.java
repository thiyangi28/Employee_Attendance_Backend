package controller;

import model.dto.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import service.EmployeeService;

@RestController()
@RequestMapping("/attendance")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @PostMapping("/punch")
    public  void addAttendance(@RequestBody Employee employee){
        employeeService.punch(employee);

    }


}
