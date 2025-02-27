package com.location.controller;

import com.location.dto.VehicleDTO;
import com.location.enums.VehicleStatus;
import com.location.exceptions.ImageNotValidException;
import com.location.exceptions.VehicleAlreadyExistsException;
import com.location.service.VehicleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;

@RestController
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    private static final Logger logger = LoggerFactory.getLogger(VehicleController.class);

    @GetMapping("/vehicle/{licensePlate}")
    public ResponseEntity<?> getVehicleById(@PathVariable String licensePlate) {
        return ResponseEntity.ok(vehicleService.getVehicleById(licensePlate));
    }

    @GetMapping("/vehicle/{licensePlate}/image")
    public ResponseEntity<?> getVehicleImage(@PathVariable String licensePlate) {
        try {
            String imagePath = vehicleService.getImagePath(licensePlate);
            return ResponseEntity.ok(imagePath);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Image not found");
        }
    }

    @GetMapping("/vehicles")
    public ResponseEntity<?> getVehicles() {
        return ResponseEntity.ok(vehicleService.getVehicles());
    }

    @PostMapping("/vehicle")
    public ResponseEntity<?> addVehicle(
            @RequestParam("licensePlate") String licensePlate,
            @RequestParam("brand") String brand,
            @RequestParam("model") String model,
            @RequestParam("year") String year,
            @RequestParam("type") String type,
            @RequestParam("status") VehicleStatus status,
            @RequestParam("price") BigDecimal price,
            @RequestParam("horsePower") String horsePower,
            @RequestParam("capacity") String capacity,
            @RequestParam("features") String features,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            if (vehicleService.isVehicleExists(licensePlate)) {
                logger.warn("Vehicle with license plate {} already exists", licensePlate);
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Vehicle with this license plate already exists");
            }

            String pathImg = saveImage(image, licensePlate);

            VehicleDTO vehicleDTO = new VehicleDTO(
                    licensePlate, brand, model, year, type, status, price, horsePower, capacity,
                    features, pathImg, null
            );

            VehicleDTO savedVehicle = vehicleService.saveVehicle(vehicleDTO);
            logger.info("Vehicle with license plate {} added successfully", licensePlate);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedVehicle);

        } catch (ImageNotValidException e) {
            logger.error("Invalid image for vehicle with license plate {}", licensePlate, e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid image");
        } catch (IOException e) {
            logger.error("Error saving image for vehicle with license plate {}", licensePlate, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving the image");
        } catch (VehicleAlreadyExistsException e) {
            logger.error("Vehicle with license plate {} already exists", licensePlate, e);
            return ResponseEntity.status(HttpStatus.CONFLICT).body("License Plate already exists");
        } catch (Exception e) {
            logger.error("An unexpected error occurred while adding vehicle with license plate {}", licensePlate, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

    @PutMapping("/vehicle/{licensePlate}")
    public ResponseEntity<?> updateVehicle(
            @PathVariable String licensePlate,
            @RequestParam("brand") String brand,
            @RequestParam("model") String model,
            @RequestParam("year") String year,
            @RequestParam("type") String type,
            @RequestParam("status") VehicleStatus status,
            @RequestParam("price") BigDecimal price,
            @RequestParam("horsePower") String horsePower,
            @RequestParam("capacity") String capacity,
            @RequestParam("features") String features,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            if (!vehicleService.isVehicleExists(licensePlate)) {
                logger.warn("Vehicle with license plate {} does not exist", licensePlate);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vehicle with this license plate does not exist");
            }

            // Manage the image
            String pathImg;
            synchronized (this) {
                if (image != null) {
                    // Delete the old image and save the new one
                    String oldImagePath = vehicleService.getImagePath(licensePlate);
                    if (oldImagePath != null && !oldImagePath.isEmpty()) {
                        vehicleService.deleteImage(licensePlate);
                    }
                    pathImg = saveImage(image, licensePlate);
                } else {
                    pathImg = vehicleService.getImagePath(licensePlate);
                }
            }

            VehicleDTO vehicleDTO = new VehicleDTO(
                    licensePlate, brand, model, year, type, status, price, horsePower, capacity,
                    features, pathImg, null
            );

            VehicleDTO updatedVehicle = vehicleService.updateVehicle(vehicleDTO);
            logger.info("Vehicle with license plate {} updated successfully", licensePlate);
            return ResponseEntity.ok(updatedVehicle);

        } catch (ImageNotValidException e) {
            logger.error("Invalid image for vehicle with license plate {}", licensePlate, e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid image");
        } catch (IOException e) {
            logger.error("Error saving image for vehicle with license plate {}", licensePlate, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving the image");
        } catch (Exception e) {
            logger.error("An unexpected error occurred while updating vehicle with license plate {}", licensePlate, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

    private String saveImage(MultipartFile image, String licensePlate) throws IOException, ImageNotValidException {
        if (image != null) {
            return vehicleService.saveImage(image, licensePlate);
        }
        return "";
    }

    @PutMapping("/vehicle/{licensePlate}/archive")
    public ResponseEntity<?> archiveVehicle(@PathVariable String licensePlate) {
        try {
            vehicleService.archiveVehicle(licensePlate);
            return ResponseEntity.ok("Vehicle archived successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // get available vehicles
    @GetMapping("/vehicles/available")
    public List<Map<String, Object>> getAvailableVehicles(
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate) {

//        OffsetDateTime startOffset = OffsetDateTime.parse(startDate);
//        OffsetDateTime endOffset = OffsetDateTime.parse(endDate);
//
//        LocalDateTime start = startOffset.toLocalDateTime();
//        LocalDateTime end = endOffset.toLocalDateTime();

        LocalDateTime start = LocalDateTime.parse(startDate);
        LocalDateTime end = LocalDateTime.parse(endDate);
        return vehicleService.getAvailableVehicles(start, end);
    }

    @GetMapping("/vehicles/available/{reservationId}")
    public List<Map<String, Object>> getAvailableVehiclesForUpdate(
            @PathVariable Long reservationId,
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate) {

        LocalDateTime start = LocalDateTime.parse(startDate);
        LocalDateTime end = LocalDateTime.parse(endDate);
        return vehicleService.getAvailableVehiclesForUpdate(reservationId, start, end);
    }

}
