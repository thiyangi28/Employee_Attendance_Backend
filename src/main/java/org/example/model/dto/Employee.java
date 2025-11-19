package org.example.model.dto;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

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
    private LocalTime arrivalTime;
    private LocalTime leaveTime;

}
