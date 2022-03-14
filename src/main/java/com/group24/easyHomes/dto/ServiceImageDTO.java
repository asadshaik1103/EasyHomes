package com.group24.easyHomes.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ServiceImageDTO {
    private String image_id;
    private String service_id;
    private String name;
    private String type;
    private byte[] image_data;

    public ServiceImageDTO(String fileName,String contentType,byte[] bytes){
        this.name = fileName;
        this.type = contentType;
        this.image_data = bytes;
    }
}
