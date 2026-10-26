import { useState } from 'react';
import { Lock, Play, Pause, Sparkles, Users, ShieldCheck, TrendingUp, Zap, Radio, Volume2, CheckCircle2 } from 'lucide-react';
import './ProjectVisual.css';

export default function ProjectVisual({ project }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const { theme, slug, title, liveUrl } = project;
  const domain = liveUrl ? liveUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : `${slug}.app`;

  const togglePlay = (e) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className={`pv pv--${slug} ${isPlaying ? 'is-playing' : 'is-paused'}`}
      style={{ '--a': theme.a, '--b': theme.b }}
      aria-label={`Animated video preview of ${title}`}
    >
      {/* 1. TOP VIDEO PLAYER & BROWSER BAR */}
      <div className="pv__bar">
        <div className="pv__dots">
          <i className="pv__dot pv__dot--red" />
          <i className="pv__dot pv__dot--yellow" />
          <i className="pv__dot pv__dot--green" />
        </div>

        <div className="pv__url-box">
          <Lock size={11} className="pv__lock" />
          <span>https://{domain}</span>
        </div>

        <div className="pv__rec-badge">
          <span className="pv__rec-dot" />
          <span>REC 1080P</span>
        </div>
      </div>

      {/* 2. VIDEO CANVAS VIEWPORT (WITH AUTOMATED SMOOTH SCROLLING WALKTHROUGH) */}
      <div className="pv__viewport">
        {/* Animated Mouse Cursor Simulation */}
        <div className="pv__cursor" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="pv__cursor-pointer">
            <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.36z" fill="#fff" stroke="#000" strokeWidth="1.5" />
          </svg>
          <span className="pv__click-ripple" />
        </div>

        {/* Video Screen Container that Scrolls */}
        <div className="pv__stream">

          {/* PROJECT 1: SCRIZA AI PLATFORM */}
          {slug === 'scriza' && (
            <div className="pv__page pv__page--scriza">
              {/* Header */}
              <div className="pv__pheader">
                <div className="pv__pbrand">
                  <Sparkles size={16} className="pv__icon-accent" />
                  <span>Scriza AI Enterprise</span>
                </div>
                <span className="pv__badge-chip">Live in Production</span>
              </div>

              {/* Hero Banner */}
              <div className="pv__phero">
                <span className="pv__subhead">Next-Gen Autonomous Infrastructure</span>
                <h4 className="pv__maintitle">AI Automation &amp; Scalable REST Microservices</h4>
                <div className="pv__cta-row">
                  <button type="button" className="pv__btn-primary">Execute Pipeline</button>
                  <button type="button" className="pv__btn-secondary">API Docs</button>
                </div>
              </div>

              {/* Live Metric Cards */}
              <div className="pv__kpigrid">
                <div className="pv__kpibox">
                  <span className="pv__kpilabel">Throughput</span>
                  <span className="pv__kpivalue">14.8k <small>req/s</small></span>
                </div>
                <div className="pv__kpibox">
                  <span className="pv__kpilabel">P99 Latency</span>
                  <span className="pv__kpivalue pv__kpivalue--green">18 <small>ms</small></span>
                </div>
                <div className="pv__kpibox">
                  <span className="pv__kpilabel">Uptime</span>
                  <span className="pv__kpivalue">99.98%</span>
                </div>
              </div>

              {/* Realtime Terminal / Log Stream */}
              <div className="pv__terminal">
                <div className="pv__term-bar">
                  <Radio size={12} className="pv__live-icon" />
                  <span>Live Production Event Stream</span>
                </div>
                <div className="pv__term-body">
                  <p><span className="pv__t-post">POST</span> /api/v2/ai/inference - 200 OK (16ms)</p>
                  <p><span className="pv__t-get">GET</span> /api/v2/solutions/hub - 200 OK (5ms)</p>
                  <p><span className="pv__t-post">POST</span> /api/v2/leads/pipeline - 201 Created (28ms)</p>
                </div>
              </div>
            </div>
          )}

          {/* PROJECT 2: THETECHTRAINING ACADEMY */}
          {slug === 'thetechtraining' && (
            <div className="pv__page pv__page--edtech">
              <div className="pv__pheader">
                <div className="pv__pbrand">
                  <Users size={16} className="pv__icon-accent" />
                  <span>TheTechTraining Academy</span>
                </div>
                <span className="pv__badge-chip">500+ Trainees</span>
              </div>

              <div className="pv__phero">
                <span className="pv__subhead">Interactive Full-Stack Pathways</span>
                <h4 className="pv__maintitle">Master Modern Web &amp; Scalable Systems</h4>
                <div className="pv__cta-row">
                  <button type="button" className="pv__btn-primary">Enroll in Batch</button>
                  <button type="button" className="pv__btn-secondary">Download Syllabus</button>
                </div>
              </div>

              <div className="pv__course-list">
                <div className="pv__course-item">
                  <div className="pv__course-meta">
                    <span className="pv__course-name">Full Stack React 18 &amp; Node.js</span>
                    <span className="pv__course-seats">6 Seats Left</span>
                  </div>
                  <div className="pv__course-bar"><div className="pv__course-fill" style={{ width: '85%' }} /></div>
                </div>

                <div className="pv__course-item">
                  <div className="pv__course-meta">
                    <span className="pv__course-name">Next.js 14 App Router &amp; Microservices</span>
                    <span className="pv__course-seats">Enrolling Now</span>
                  </div>
                  <div className="pv__course-bar"><div className="pv__course-fill" style={{ width: '60%' }} /></div>
                </div>
              </div>

              <div className="pv__roadmap-preview">
                <span className="pv__rm-label">Learning Track:</span>
                <span className="pv__rm-node is-done">Core JS</span>
                <span className="pv__rm-sep">→</span>
                <span className="pv__rm-node is-active">React &amp; Next</span>
                <span className="pv__rm-sep">→</span>
                <span className="pv__rm-node">REST APIs</span>
                <span className="pv__rm-sep">→</span>
                <span className="pv__rm-node">Scale</span>
              </div>
            </div>
          )}

          {/* PROJECT 3: HRVICO HRMS SAAS */}
          {slug === 'hrvico' && (
            <div className="pv__page pv__page--hrvico">
              <div className="pv__pheader">
                <div className="pv__pbrand">
                  <ShieldCheck size={16} className="pv__icon-accent" />
                  <span>HRVico Cloud HRMS</span>
                </div>
                <span className="pv__badge-chip pv__badge-chip--pink">Biometric Sync: Online</span>
              </div>

              <div className="pv__phero">
                <span className="pv__subhead">Automated Workforce Operations</span>
                <h4 className="pv__maintitle">Biometric Punch-In &amp; Real-Time Payroll</h4>
                <div className="pv__cta-row">
                  <button type="button" className="pv__btn-primary">Generate Payslips</button>
                  <button type="button" className="pv__btn-secondary">View Roster</button>
                </div>
              </div>

              <div className="pv__kpigrid">
                <div className="pv__kpibox">
                  <span className="pv__kpilabel">Today Attendance</span>
                  <span className="pv__kpivalue pv__kpivalue--green">98.4%</span>
                </div>
                <div className="pv__kpibox">
                  <span className="pv__kpilabel">Payroll Status</span>
                  <span className="pv__kpivalue">Disbursed</span>
                </div>
                <div className="pv__kpibox">
                  <span className="pv__kpilabel">Leaves</span>
                  <span className="pv__kpivalue">0 Pending</span>
                </div>
              </div>

              <div className="pv__table-widget">
                <div className="pv__t-row pv__t-header">
                  <span>Team Member</span>
                  <span>Role</span>
                  <span>Time</span>
                  <span>Status</span>
                </div>
                <div className="pv__t-row">
                  <span>Gyanvendra M.</span>
                  <span>Tech Lead</span>
                  <span>09:12 AM</span>
                  <span className="pv__t-present">Present</span>
                </div>
                <div className="pv__t-row">
                  <span>Ananya Verma</span>
                  <span>Frontend</span>
                  <span>09:25 AM</span>
                  <span className="pv__t-present">Present</span>
                </div>
              </div>
            </div>
          )}

          {/* PROJECT 4: EDU2ALL ADMISSIONS */}
          {slug === 'edu2all' && (
            <div className="pv__page pv__page--edu">
              <div className="pv__pheader">
                <div className="pv__pbrand">
                  <TrendingUp size={16} className="pv__icon-accent" />
                  <span>Edu2All Admissions Portal</span>
                </div>
                <span className="pv__badge-chip">Smart Filter AI</span>
              </div>

              <div className="pv__phero">
                <span className="pv__subhead">Centralized College Match Engine</span>
                <h4 className="pv__maintitle">Find Verified Institutes &amp; Courses in Seconds</h4>
                <div className="pv__search-input-sim">
                  <span>🔍 Search B.Tech, MBA, MCA colleges...</span>
                  <span className="pv__search-tag">Filter</span>
                </div>
              </div>

              <div className="pv__college-stack">
                <div className="pv__c-card">
                  <div className="pv__c-head">
                    <span className="pv__c-title">Apex Institute of Engineering</span>
                    <span className="pv__c-rank">Rank #4</span>
                  </div>
                  <div className="pv__c-badges">
                    <span>NAAC A++</span>
                    <span>94% Placement</span>
                    <span>₹2.4L / yr</span>
                  </div>
                </div>

                <div className="pv__c-card">
                  <div className="pv__c-head">
                    <span className="pv__c-title">Metropolitan Management Academy</span>
                    <span className="pv__c-rank">Rank #9</span>
                  </div>
                  <div className="pv__c-badges">
                    <span>AICTE Approved</span>
                    <span>Top Recruiters</span>
                    <span>₹3.1L / yr</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PROJECT 5: JAWAI SAFARI */}
          {slug === 'jawai-safari' && (
            <div className="pv__page pv__page--safari">
              <div className="pv__pheader">
                <div className="pv__pbrand">
                  <Zap size={16} className="pv__icon-accent" />
                  <span>Jawai Leopard Safari</span>
                </div>
                <span className="pv__badge-chip pv__badge-chip--warm">3 Sightings Today</span>
              </div>

              <div className="pv__phero">
                <span className="pv__subhead">Edge-Fast Next.js 14 Booking</span>
                <h4 className="pv__maintitle">Wildlife Expedition &amp; Granite Hills Trails</h4>
                <div className="pv__cta-row">
                  <button type="button" className="pv__btn-primary">Book Safari Slot</button>
                  <button type="button" className="pv__btn-secondary">Check Map</button>
                </div>
              </div>

              <div className="pv__slot-stack">
                <div className="pv__slot-item is-featured">
                  <div className="pv__slot-details">
                    <span className="pv__slot-timing">Sunrise Safari (05:45 AM)</span>
                    <span className="pv__slot-sub">Zone A • 4 Gypsies Available</span>
                  </div>
                  <span className="pv__slot-badge">Fast Fill</span>
                </div>

                <div className="pv__slot-item">
                  <div className="pv__slot-details">
                    <span className="pv__slot-timing">Sunset Leopard Trail (04:15 PM)</span>
                    <span className="pv__slot-sub">Zone B • 2 Slots Left Today</span>
                  </div>
                  <span className="pv__slot-badge">Available</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* 3. BOTTOM VIDEO HUD CONTROLS (SCRUBBER & PLAY/PAUSE) */}
      <div className="pv__hud">
        <button
          type="button"
          onClick={togglePlay}
          className="pv__play-btn"
          aria-label={isPlaying ? 'Pause video demo' : 'Play video demo'}
        >
          {isPlaying ? <Pause size={12} /> : <Play size={12} />}
          <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
        </button>

        <div className="pv__timeline">
          <div className="pv__scrub-track">
            <div className="pv__scrub-fill" />
          </div>
          <span className="pv__timecode">00:24 / 01:45</span>
        </div>

        <div className="pv__equalizer" title="Video audio stream">
          <span /><span /><span /><span />
        </div>
      </div>
    </div>
  );
}
