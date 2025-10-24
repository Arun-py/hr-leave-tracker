import nodemailer from 'nodemailer';

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// @desc    Handle contact form submission
// @route   POST /api/public/contact
// @access  Public
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, company, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please provide name, email, and message' });
    }

    // Email content
    const mailOptions = {
      from: email,
      to: '727723euee010@skcet.ac.in',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f59e0b;">New Contact Form Submission</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <hr style="border: 1px solid #d1d5db; margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
            This email was sent from HR Leave Tracker contact form.
          </p>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      message: 'Thank you for contacting us! We will get back to you soon.' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      message: 'Failed to send message. Please try again later.' 
    });
  }
};

// @desc    Handle career application submission
// @route   POST /api/public/careers
// @access  Public
export const submitCareerApplication = async (req, res) => {
  try {
    const { 
      fullName, 
      email, 
      phone, 
      position, 
      experience, 
      coverLetter,
      resume 
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !position) {
      return res.status(400).json({ 
        message: 'Please provide all required fields' 
      });
    }

    // Email content
    const mailOptions = {
      from: email,
      to: '727723euee010@skcet.ac.in',
      subject: `New Career Application: ${position} - ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f59e0b;">New Career Application</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
            <p><strong>Position Applied For:</strong> ${position}</p>
            <hr style="border: 1px solid #d1d5db; margin: 15px 0;">
            <p><strong>Full Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Years of Experience:</strong> ${experience || 'Not specified'}</p>
            <hr style="border: 1px solid #d1d5db; margin: 15px 0;">
            <p><strong>Cover Letter:</strong></p>
            <p style="white-space: pre-wrap;">${coverLetter || 'Not provided'}</p>
            ${resume ? `<p><strong>Resume:</strong> ${resume}</p>` : ''}
          </div>
          <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
            This email was sent from HR Leave Tracker careers page.
          </p>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      message: 'Application submitted successfully! We will review your application and get back to you soon.' 
    });
  } catch (error) {
    console.error('Career application error:', error);
    res.status(500).json({ 
      message: 'Failed to submit application. Please try again later.' 
    });
  }
};

// @desc    Handle newsletter subscription
// @route   POST /api/public/subscribe
// @access  Public
export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Please provide an email address' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    // Send notification email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: '727723euee010@skcet.ac.in',
      subject: 'New Newsletter Subscription',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f59e0b;">New Newsletter Subscriber</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subscribed At:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      message: 'Successfully subscribed to newsletter!' 
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ 
      message: 'Failed to subscribe. Please try again later.' 
    });
  }
};

// @desc    Submit community discussion
// @route   POST /api/public/discussion
// @access  Public
export const submitDiscussion = async (req, res) => {
  try {
    const { category, title, content, author, email } = req.body;

    if (!category || !title || !content) {
      return res.status(400).json({ 
        message: 'Please provide category, title, and content' 
      });
    }

    // Send notification email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: '727723euee010@skcet.ac.in',
      subject: `New Discussion: ${title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f59e0b;">New Community Discussion</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Title:</strong> ${title}</p>
            <p><strong>Author:</strong> ${author || 'Anonymous'}</p>
            <p><strong>Email:</strong> ${email || 'Not provided'}</p>
            <hr style="border: 1px solid #d1d5db; margin: 15px 0;">
            <p><strong>Content:</strong></p>
            <p style="white-space: pre-wrap;">${content}</p>
          </div>
          <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
            Posted on ${new Date().toLocaleString()}
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      message: 'Discussion posted successfully!' 
    });
  } catch (error) {
    console.error('Discussion submission error:', error);
    res.status(500).json({ 
      message: 'Failed to post discussion. Please try again later.' 
    });
  }
};
