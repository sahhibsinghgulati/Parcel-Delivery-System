package com.example.parcel.service;
import com.example.parcel.dto.FeedbackRequest;
import com.example.parcel.entity.Feedback;
import com.example.parcel.entity.Parcel;
import com.example.parcel.entity.User;
import com.example.parcel.repository.FeedbackRepository;
import com.example.parcel.repository.ParcelRepository;
import com.example.parcel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;
    @Autowired
    private ParcelRepository parcelRepository;
    @Autowired
    private UserRepository userRepository;

    public Feedback submitFeedback(FeedbackRequest request, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Parcel parcel = parcelRepository.findById(request.getParcelId())
                .orElseThrow(() -> new RuntimeException("Parcel not found"));

        if (!parcel.getSender().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        Feedback feedback = Feedback.builder()
                .parcel(parcel)
                .user(user)
                .rating(request.getRating())
                .comment(request.getComment())
                .createdAt(LocalDateTime.now())
                .build();

        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getFeedbackForParcel(Long parcelId) {
        return feedbackRepository.findByParcelId(parcelId);
    }
}

