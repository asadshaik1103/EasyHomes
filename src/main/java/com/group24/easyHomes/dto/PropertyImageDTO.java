package com.group24.easyHomes.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PropertyImageDTO {
        private String id;
        private Integer propertyId;
     /*   private String name;
        private String type;*/
        private byte[] image_data;

        public PropertyImageDTO(String fileName, String contentType, byte[] bytes) {
//                this.name = fileName;
//                this.type = contentType;
                this.image_data  = bytes;
        }
}

