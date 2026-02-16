package com.flowbuddy.flowbuddy_backend.dto;

public class UserPreferenceRequest {
    
    private Integer userId;
    private String tone;
    private String goal;
    private String focusTime;

    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }

    public String getTone() { return tone; }
    public void setTone(String tone) { this.tone = tone; }

    public String getGoal() { return goal; }
    public void setGoal(String goal) { this.goal = goal; }

    public String getFocusTime() { return focusTime; }
    public void setFocusTime(String focusTime) { this.focusTime = focusTime; }
}
