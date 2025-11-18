package model.dto;

import lombok.*;

import java.time.LocalDate;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class Employee {

    //use for API intergration

    private int id;
    private String name;
    private LocalDate date;
    private LocalDate arrivalTime;
    private LocalDate leaveTime;


}
