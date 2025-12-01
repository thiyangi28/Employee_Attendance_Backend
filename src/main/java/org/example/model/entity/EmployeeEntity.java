package org.example.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name ="attendance")
public class EmployeeEntity {

    @Id
    private int id;
    private String name;
    private LocalDate date;
    private LocalTime arrivalTime;
    private LocalTime leaveTime;

}
