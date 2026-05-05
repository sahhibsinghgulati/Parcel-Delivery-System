package com.example.parcel.controller;

import com.example.parcel.dto.FeedbackRequest;
import com.example.parcel.entity.Feedback;
import com.example.parcel.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {
    @Autowired
    private FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<Feedback> submitFeedback(@RequestBody FeedbackRequest request, Authentication authentication) {
        return ResponseEntity.ok(feedbackService.submitFeedback(request, authentication.getName()));
    }

    @GetMapping("/{parcelId}")
    public ResponseEntity<List<Feedback>> getFeedback(@PathVariable Long parcelId) {
        return ResponseEntity.ok(feedbackService.getFeedbackForParcel(parcelId));
    }
}

