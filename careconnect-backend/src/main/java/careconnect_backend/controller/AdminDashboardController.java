package careconnect_backend.controller;

import careconnect_backend.repository.AppointmentRepository;
import careconnect_backend.repository.DoctorRepository;
import careconnect_backend.repository.UserRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminDashboardController {

    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;
    private final AppointmentRepository appointmentRepository;

    public AdminDashboardController(
            DoctorRepository doctorRepository,
            UserRepository userRepository,
            AppointmentRepository appointmentRepository) {

        this.doctorRepository = doctorRepository;
        this.userRepository = userRepository;
        this.appointmentRepository = appointmentRepository;
    }

    @GetMapping
    public Map<String, Long> getDashboardData() {

        Map<String, Long> dashboardData = new HashMap<>();

        dashboardData.put(
                "totalDoctors",
                doctorRepository.count()
        );

        dashboardData.put(
                "totalPatients",
                userRepository.count()
        );

        dashboardData.put(
                "totalAppointments",
                appointmentRepository.count()
        );

        return dashboardData;
    }
}