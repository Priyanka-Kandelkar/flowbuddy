package com.flowbuddy.flowbuddy_backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "user_preferences")
public class UserPreference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pref_id")
    private Integer prefId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "tone")
    private String tone;

    @Column(name = "reminder_frequency")
    private String focusTime;

    @Column(name = "focus")
    private String goal;

    public Integer getPrefId() { return prefId; }
    public void setPrefId(Integer prefId) { this.prefId = prefId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getTone() { return tone; }
    public void setTone(String tone) { this.tone = tone; }

    public String getGoal() { return goal; }
    public void setGoal(String goal) { this.goal = goal; }

    public String getFocusTime() { return focusTime; }
    public void setFocusTime(String focusTime) { this.focusTime = focusTime; }
}