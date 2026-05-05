package com.example.parcel.repository;
import com.example.parcel.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByParcelId(Long parcelId);
    List<Feedback> findByUserId(Long userId);
}

