// Browser Notification Service
class NotificationService {
  constructor() {
    this.permission = 'default';
    this.init();
  }

  async init() {
    if ('Notification' in window) {
      this.permission = Notification.permission;
      if (this.permission === 'default') {
        await this.requestPermission();
      }
    }
  }

  async requestPermission() {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      this.permission = permission;
      return permission === 'granted';
    }
    return false;
  }

  async showNotification(title, options = {}) {
    if (!('Notification' in window)) {
      console.warn('Browser does not support notifications');
      return null;
    }

    if (this.permission === 'granted') {
      const notification = new Notification(title, {
        icon: '/logo.png',
        badge: '/logo.png',
        vibrate: [200, 100, 200],
        tag: 'notification-' + Date.now(),
        requireInteraction: false,
        ...options
      });

      notification.onclick = (event) => {
        event.preventDefault();
        window.focus();
        if (options.onClick) {
          options.onClick();
        }
        notification.close();
      };

      return notification;
    } else if (this.permission === 'default') {
      const granted = await this.requestPermission();
      if (granted) {
        return this.showNotification(title, options);
      }
    }

    return null;
  }

  showCourseNotification(courseTitle) {
    return this.showNotification('New Course Available!', {
      body: `Check out the new course: ${courseTitle}`,
      icon: '/course-icon.png',
      tag: 'course'
    });
  }

  showChallengeNotification(challengeTitle) {
    return this.showNotification('New Challenge!', {
      body: `A new challenge is available: ${challengeTitle}`,
      icon: '/challenge-icon.png',
      tag: 'challenge'
    });
  }

  showEnrollmentSuccess(courseTitle) {
    return this.showNotification('Enrollment Successful!', {
      body: `You have successfully enrolled in: ${courseTitle}`,
      icon: '/success-icon.png',
      tag: 'enrollment'
    });
  }

  showChallengeSubmitted(challengeTitle) {
    return this.showNotification('Challenge Submitted!', {
      body: `Your submission for "${challengeTitle}" has been received`,
      icon: '/success-icon.png',
      tag: 'submission'
    });
  }

  showAchievement(achievementTitle, description) {
    return this.showNotification('Achievement Unlocked! 🏆', {
      body: `${achievementTitle}: ${description}`,
      icon: '/achievement-icon.png',
      tag: 'achievement'
    });
  }
}

export default new NotificationService();
