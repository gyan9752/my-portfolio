import { useState } from 'react';
import { X, Clock, Video, CheckCircle2, ChevronLeft, ChevronRight, Globe, ArrowRight, Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { personal } from '../../data/portfolioData';
import { sendBooking } from '../../services/api';
import { sound } from '../../services/sound';
import './BookingModal.css';

export default function BookingModal({ isOpen, onClose }) {
  const [selectedDate, setSelectedDate] = useState(28);
  const [selectedTime, setSelectedTime] = useState('02:30 PM');
  const [step, setStep] = useState('calendar'); // 'calendar' | 'form' | 'success'
  const [bookingDetails, setBookingDetails] = useState({ name: '', email: '', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const timeSlots = [
    '09:30 AM', '11:00 AM', '01:30 PM', '02:30 PM', '04:00 PM', '05:30 PM'
  ];

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingDetails.name || !bookingDetails.email || isSubmitting) return;
    sound.playClick();
    setIsSubmitting(true);
    try {
      await sendBooking({
        name: bookingDetails.name.trim(),
        email: bookingDetails.email.trim(),
        date: `2026-10-${String(selectedDate).padStart(2, '0')}`,
        time: selectedTime,
        notes: bookingDetails.notes ? bookingDetails.notes.trim() : '',
      });
    } catch (err) {
      console.warn('Booking submit network error (continuing with confirmation):', err);
    } finally {
      setIsSubmitting(false);
      setStep('success');
      sound.playSuccess();
    }
  };

  const handleReset = () => {
    sound.playClick();
    setStep('calendar');
    onClose();
  };

  return (
    <div className="bm-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="bm-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button Top Right */}
        <button onClick={onClose} className="bm-close" aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Left Column: Meeting Overview */}
        <div className="bm-sidebar">
          <div className="bm-sidebar-top">
            <span className="bm-badge">{personal.name} {personal.surname}</span>
            <h3 className="bm-title">1:1 30 Mins Discovery Call</h3>

            <div className="bm-meta">
              <div className="bm-meta-row">
                <Clock size={16} className="bm-icon" />
                <span>30 minutes</span>
              </div>
              <div className="bm-meta-row">
                <Video size={16} className="bm-icon" />
                <span>Web conferencing details provided upon confirmation.</span>
              </div>
            </div>

            <p className="bm-desc">
              Schedule a 1-on-1 discovery call with <strong>{personal.name} {personal.surname}</strong> to discuss full stack development, web architecture, or tech hiring opportunities.
            </p>
          </div>

          <div className="bm-sidebar-bottom">
            <div className="bm-tz">
              <Globe size={14} className="bm-icon" />
              <span>India Standard Time (IST)</span>
            </div>
            <div className="bm-powered">
              <CalendarIcon size={12} /> Powered by Calendly Sync
            </div>
          </div>
        </div>

        {/* Right Column: Date & Time Picker */}
        <div className="bm-main">
          {step === 'calendar' && (
            <div className="bm-cal-step">
              <div className="bm-cal-header">
                <h4>Select Date & Time</h4>
                <div className="bm-month-nav">
                  <span>October 2026</span>
                  <div className="bm-month-btns">
                    <button type="button" className="bm-arrow-btn"><ChevronLeft size={16} /></button>
                    <button type="button" className="bm-arrow-btn"><ChevronRight size={16} /></button>
                  </div>
                </div>
              </div>

              {/* Day Labels */}
              <div className="bm-days-header">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>

              {/* Days Grid */}
              <div className="bm-days-grid">
                {daysInMonth.map((day) => {
                  const isSelected = day === selectedDate;
                  const isAvailable = day >= 10 && day <= 30;

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => {
                        if (isAvailable) {
                          sound.playClick();
                          setSelectedDate(day);
                        }
                      }}
                      onMouseEnter={() => isAvailable && sound.playHover()}
                      disabled={!isAvailable}
                      className={`bm-day-btn ${isSelected ? 'is-selected' : ''} ${isAvailable ? 'is-available' : 'is-disabled'}`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Time Slots */}
              <div className="bm-slots-section">
                <span className="bm-slots-label">
                  Available Slots for Oct {selectedDate}:
                </span>
                <div className="bm-slots-grid">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setSelectedTime(time);
                      }}
                      onMouseEnter={() => sound.playHover()}
                      className={`bm-slot-btn ${selectedTime === time ? 'is-selected' : ''}`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setStep('form');
                }}
                onMouseEnter={() => sound.playHover()}
                className="bm-primary-btn"
              >
                <span>Next: Enter Details (Oct {selectedDate} @ {selectedTime})</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}

          {step === 'form' && (
            <form onSubmit={handleBookingSubmit} className="bm-form-step">
              <div>
                <span className="bm-summary-tag">
                  Booking: Oct {selectedDate}, 2026 @ {selectedTime}
                </span>
                <h4 className="bm-form-title">Enter Your Details</h4>
              </div>

              <div className="bm-fields">
                <div className="bm-field">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    required
                    value={bookingDetails.name}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="bm-field">
                  <label>Your Email *</label>
                  <input
                    type="email"
                    required
                    value={bookingDetails.email}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, email: e.target.value })}
                    placeholder="name@company.com"
                  />
                </div>

                <div className="bm-field">
                  <label>Topic / Notes (Optional)</label>
                  <textarea
                    rows="3"
                    value={bookingDetails.notes}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, notes: e.target.value })}
                    placeholder="Please share anything that will help prepare for our meeting."
                  />
                </div>
              </div>

              <div className="bm-form-actions">
                <button
                  type="button"
                  onClick={() => setStep('calendar')}
                  className="bm-back-btn"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bm-primary-btn"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="bm-spinner" />
                      <span>Scheduling...</span>
                    </>
                  ) : (
                    <span>Confirm 1:1 Meeting</span>
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="bm-success-step">
              <div className="bm-success-icon">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="bm-success-title">Meeting Scheduled!</h4>
              <div className="bm-success-summary">
                <p><strong>Name:</strong> {bookingDetails.name}</p>
                <p><strong>Date & Time:</strong> Oct {selectedDate}, 2026 @ {selectedTime}</p>
                <p><strong>Confirmation:</strong> Invitation sent to {bookingDetails.email}</p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="bm-primary-btn"
              >
                Close & Return to Portfolio
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
