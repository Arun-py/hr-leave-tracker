# HR Leave Tracker - Image Setup

## Moving Avatar Image

Please move your avatar image to the assets folder:

**From:** `C:\Users\arunc\Downloads\MERN_STACK_PROJECTs\HR_LEAVE_TRACKER\hr-avatar.png`

**To:** `C:\Users\arunc\Downloads\MERN_STACK_PROJECTs\HR_LEAVE_TRACKER\frontend\src\assets\images\hr-avatar.png`

You can use this PowerShell command:

```powershell
Move-Item "C:\Users\arunc\Downloads\MERN_STACK_PROJECTs\HR_LEAVE_TRACKER\hr-avatar.png" "C:\Users\arunc\Downloads\MERN_STACK_PROJECTs\HR_LEAVE_TRACKER\frontend\src\assets\images\hr-avatar.png"
```

## Using Images in Components

After moving the image, you can use it in your components like this:

```javascript
import hrAvatar from '../assets/images/hr-avatar.png';

// Then in your component:
<img src={hrAvatar} alt="HR Avatar" className="w-20 h-20 rounded-full" />
```

## Adding User Profile Photos

To add profile photo functionality:

1. The image folder is already created at: `frontend/src/assets/images/`
2. You can add a photo upload feature in the Profile page
3. Store photo URLs in the User model (already has support for this)
