package com.example.parcel.dto;
import lombok.Data;
@Data
public class CreateParcelRequest {
    private String receiver;
    private Double cost;
}
