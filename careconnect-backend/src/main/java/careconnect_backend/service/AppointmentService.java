package careconnect_backend.service;

import careconnect_backend.entity.Appointment;
import careconnect_backend.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    // Create appointment
    public Appointment createAppointment(Appointment appointment) {

        if (appointment.getStatus() == null ||
                appointment.getStatus().isBlank()) {
            appointment.setStatus("Confirmed");
        }

        return appointmentRepository.save(appointment);
    }

    // Get all appointments
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    // Get appointment by ID
    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Appointment not found"));
    }

    // Update appointment
    public Appointment updateAppointment(
            Long id,
            Appointment updatedAppointment) {

        Appointment appointment = getAppointmentById(id);

        appointment.setAppointmentDate(
                updatedAppointment.getAppointmentDate());

        appointment.setAppointmentTime(
                updatedAppointment.getAppointmentTime());

        appointment.setReason(
                updatedAppointment.getReason());

        appointment.setStatus(
                updatedAppointment.getStatus());

        return appointmentRepository.save(appointment);
    }

    // Delete appointment
    public void deleteAppointment(Long id) {
        Appointment appointment = getAppointmentById(id);
        appointmentRepository.delete(appointment);
    }
}