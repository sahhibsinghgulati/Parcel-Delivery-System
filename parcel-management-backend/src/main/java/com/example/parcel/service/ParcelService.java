package com.example.parcel.service;
import com.example.parcel.dto.CreateParcelRequest;
import com.example.parcel.entity.Parcel;
import com.example.parcel.entity.User;
import com.example.parcel.repository.ParcelRepository;
import com.example.parcel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
@Service
public class ParcelService {
    @Autowired
    private ParcelRepository parcelRepository;
    @Autowired
    private UserRepository userRepository;
    public Parcel createParcel(CreateParcelRequest request, String username) {
        User sender = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Parcel parcel = Parcel.builder()
                .sender(sender)
                .receiver(request.getReceiver())
                .cost(request.getCost())
                .status(Parcel.ParcelStatus.CREATED)
                .createdAt(LocalDateTime.now())
                .build();
        return parcelRepository.save(parcel);
    }
    public List<Parcel> listParcelsForUser(String username) {
        User sender = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return parcelRepository.findBySenderId(sender.getId());
    }
    public Parcel trackParcel(Long id) {
        return parcelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Parcel not found"));
    }
}
