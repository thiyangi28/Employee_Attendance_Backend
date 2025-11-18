package model.entity;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class EmployeeEntity {

    private int id;
    private String name;
    private LocalDate date;
    private LocalDate arrivalTime;
    private LocalDate leaveTime;

}
