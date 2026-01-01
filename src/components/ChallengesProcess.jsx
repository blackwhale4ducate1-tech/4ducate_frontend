import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ChallengesProcess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { challengeIndex } = location.state || { challengeIndex: 0 };
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      title: "Understand the Problem",
      description: "Analyze the challenge requirements and constraints. Review the problem statement and example cases.",
      icon: "fas fa-book-open",
      tasks: [
        { id: 1, text: "Read problem statement", completed: false },
        { id: 2, text: "Analyze input/output examples", completed: false },
        { id: 3, text: "Identify constraints", completed: false }
      ]
    },
    {
      title: "Design Solution",
      description: "Plan your approach and create a solution architecture. Consider edge cases and optimization.",
      icon: "fas fa-pencil-ruler",
      tasks: [
        { id: 1, text: "Choose appropriate data structures", completed: false },
        { id: 2, text: "Design algorithm flow", completed: false },
        { id: 3, text: "Plan for edge cases", completed: false }
      ]
    },
    {
      title: "Implement Code",
      description: "Write clean, efficient code to solve the challenge. Test with sample inputs.",
      icon: "fas fa-code",
      tasks: [
        { id: 1, text: "Write initial solution", completed: false },
        { id: 2, text: "Test with sample inputs", completed: false },
        { id: 3, text: "Optimize code", completed: false }
      ]
    },
    {
      title: "Submit & Review",
      description: "Submit your solution and review the results. Optimize based on feedback if needed.",
      icon: "fas fa-check-circle",
      tasks: [
        { id: 1, text: "Run test cases", completed: false },
        { id: 2, text: "Submit solution", completed: false },
        { id: 3, text: "Review performance", completed: false }
      ]
    }
  ];

  const [taskStatus, setTaskStatus] = useState(
    steps.map(step => step.tasks.map(task => ({ ...task })))
  );

  const handleTaskToggle = (stepIndex, taskId) => {
    setTaskStatus(prev => {
      const newStatus = [...prev];
      newStatus[stepIndex] = newStatus[stepIndex].map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      return newStatus;
    });

    // Check if all tasks in current step are completed
    const allTasksCompleted = taskStatus[stepIndex].every(task => 
      task.id === taskId ? !task.completed : task.completed
    );

    if (allTasksCompleted && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const isStepCompleted = (stepIndex) => {
    return taskStatus[stepIndex].every(task => task.completed);
  };

  return (
    <>
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        rel="stylesheet" 
      />
      <style>
        {`
          @keyframes slideInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-in {
            animation: slideInUp 0.6s ease-out forwards;
          }
          
          .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            position: relative;
            overflow: hidden;
          }
          
          .gradient-bg::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            opacity: 0.6;
          }
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: #f8fafc;
          }
        `}
      </style>
      <div className="min-vh-100" style={{ backgroundColor: '#f8fafc' }}>
        <div className="gradient-bg text-white">
          <div className="container-fluid px-4 py-4">
            <div className="row align-items-center animate-in">
              <div className="col-lg-8 col-md-12">
                <h1 className="h3 fw-bold mb-2" style={{ letterSpacing: '-0.02em' }}>
                  Challenge Process
                </h1>
                <p className="mb-0 opacity-90" style={{ fontSize: '16px' }}>
                  Complete your challenge step by step
                </p>
              </div>
              <div className="col-lg-4 col-md-12 mt-3 mt-lg-0">
                <button
                  className="btn btn-outline-light px-4 py-2"
                  onClick={() => navigate('/dashboard/challengesprocess')}
                >
                  <i className="fas fa-arrow-left me-2"></i>
                  Back to Challenges
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid px-4 py-4">
          <div className="row">
            {steps.map((step, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-4">
                <div 
                  className="card border-0 h-100"
                  style={{
                    borderRadius: '16px',
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    opacity: currentStep >= index + 1 ? 1 : 0.5,
                    pointerEvents: currentStep >= index + 1 ? 'auto' : 'none'
                  }}
                >
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: '50px',
                          height: '50px',
                          background: `linear-gradient(135deg, ${currentStep > index + 1 ? '#10b981' : '#3b82f6'}20 0%, ${currentStep > index + 1 ? '#10b981' : '#3b82f6'}40 100%)`,
                          color: currentStep > index + 1 ? '#10b981' : '#3b82f6'
                        }}
                      >
                        <i className={`${step.icon} fa-lg`}></i>
                      </div>
                      <h5 className="fw-bold mb-0" style={{ color: '#1e293b', fontSize: '18px' }}>
                        {step.title}
                      </h5>
                    </div>
                    <p className="text-muted mb-4" style={{ fontSize: '14px' }}>
                      {step.description}
                    </p>
                    <div className="mb-3">
                      {taskStatus[index].map(task => (
                        <div key={task.id} className="form-check mb-2">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={task.completed}
                            onChange={() => handleTaskToggle(index, task.id)}
                            disabled={currentStep < index + 1}
                            style={{
                              borderRadius: '4px',
                              border: '2px solid #e2e8f0'
                            }}
                          />
                          <label 
                            className="form-check-label" 
                            style={{ 
                              fontSize: '14px',
                              color: task.completed ? '#10b981' : '#64748b',
                              textDecoration: task.completed ? 'line-through' : 'none'
                            }}
                          >
                            {task.text}
                          </label>
                        </div>
                      ))}
                    </div>
                    {isStepCompleted(index) && (
                      <div 
                        className="badge w-100 py-2"
                        style={{
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          color: 'white',
                          borderRadius: '12px',
                          fontSize: '13px',
                          fontWeight: '600'
                        }}
                      >
                        Completed
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {isStepCompleted(3) && (
            <div className="text-center mt-4">
              <button 
                className="btn btn-primary px-5 py-3 fw-bold"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '12px',
                  border: 'none'
                }}
                onClick={() => navigate('/dashboard/challengesprocess')}
              >
                <i className="fas fa-trophy me-2"></i>
                Return to Challenges
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChallengesProcess;