# GoDaddy Linux Server Deployment Guide
## Dr. Immanuelle Manohar's Academic Website

---

## Pre-Deployment Checklist

### Files Ready for Upload:
- ✅ All HTML files (index.html, research.html, publications.html, teaching.html, resume.html, contact.html)
- ✅ CSS files in `/css/` directory
- ✅ JavaScript files in `/js/` directory
- ✅ Images in `/images/` directory
- ✅ Components in `/components/` directory
- ✅ .htaccess file for Apache configuration
- ✅ favicon.ico

---

## Deployment Steps for GoDaddy Linux Hosting

### Step 1: Access Your GoDaddy Hosting Account
1. Log in to your GoDaddy account
2. Go to **My Products** → **Web Hosting**
3. Click **Manage** next to your hosting plan

### Step 2: Upload Files via FTP or File Manager

#### Option A: Using GoDaddy File Manager (Easier)
1. In cPanel, click **File Manager**
2. Navigate to `public_html` directory (or `html_public` depending on your setup)
3. **Delete any default files** (index.html, default.html, etc.)
4. Upload all contents from your local `public_html` folder:
   - Upload all `.html` files
   - Upload the `css` folder
   - Upload the `js` folder
   - Upload the `images` folder
   - Upload the `components` folder
   - Upload `favicon.ico`
   - Upload `.htaccess` file (make sure to show hidden files)

#### Option B: Using FTP Client (FileZilla, WinSCP, etc.)
1. Get your FTP credentials from GoDaddy cPanel
2. Connect to your server using FTP client
3. Navigate to `public_html` directory
4. Upload all files from your local `public_html` folder

### Step 3: Set File Permissions
In File Manager or FTP:
- **Directories**: Set to `755`
- **Files**: Set to `644`
- **.htaccess**: Set to `644`

### Step 4: Verify .htaccess File
1. Make sure `.htaccess` is in the root of `public_html`
2. Enable "Show Hidden Files" in File Manager to see it
3. The .htaccess file includes:
   - HTTPS redirect (if you have SSL)
   - Security headers
   - Browser caching
   - GZIP compression

### Step 5: SSL Certificate Setup (Important!)
1. In GoDaddy cPanel, go to **SSL/TLS Status**
2. Install a free SSL certificate (Let's Encrypt or GoDaddy's free SSL)
3. Once SSL is active, your .htaccess will automatically redirect HTTP to HTTPS

### Step 6: DNS Configuration
1. Make sure your domain is pointing to GoDaddy nameservers
2. In GoDaddy DNS settings:
   - **A Record**: Points to your server IP
   - **CNAME** (www): Points to your domain

Typical DNS records:
```
Type    Name    Value                   TTL
A       @       Your_Server_IP          600
CNAME   www     @                       1 Hour
```

---

## Post-Deployment Verification

### Test the Following:

1. **Homepage**: Visit `https://yourdomain.com`
   - Check if it loads correctly
   - Verify neural network background animation

2. **Navigation**: Test all menu links
   - Home → index.html
   - Research → research.html
   - Publications → publications.html
   - Teaching → teaching.html
   - Resume → resume.html
   - Contact → contact.html

3. **Mobile Responsiveness**:
   - Resize browser to < 768px
   - Test hamburger menu functionality
   - Verify dropdown menu works

4. **Images**: Check all images load properly
   - Profile image on home page
   - Research thumbnails
   - Teaching images

5. **External Links**: Verify these work
   - Google Scholar profile
   - LinkedIn profile
   - Website links (drminnovations.com, truetechspokane.com, idr-stat.com)

6. **SSL Certificate**:
   - Check for padlock icon in browser
   - Verify HTTPS redirect works

7. **Browser Console**:
   - Open Developer Tools (F12)
   - Check for any JavaScript errors
   - Verify no 404 errors for resources

---

## File Structure on Server

Your `public_html` directory should look like this:

```
public_html/
├── .htaccess
├── favicon.ico
├── index.html
├── research.html
├── publications.html
├── teaching.html
├── resume.html
├── contact.html
├── home.html (optional backup)
├── components/
│   └── header.html
├── css/
│   ├── styles.css
│   └── multiColumnTemplate.css
├── js/
│   ├── main.js
│   └── header-loader.js
└── images/
    ├── pic_1.jpg
    ├── ICA_figure.jpg
    ├── QR.jpg
    ├── IM_ret.png
    ├── big_data.png
    ├── computation.png
    ├── Teacher_monkey.jpg
    └── ... (all other images)
```

---

## Troubleshooting Common Issues

### Issue 1: Images Not Loading
- **Solution**: Check file paths are relative (e.g., `images/pic_1.jpg` not `/images/pic_1.jpg`)
- Verify image file names match exactly (case-sensitive on Linux)

### Issue 2: .htaccess Not Working
- **Solution**: Make sure mod_rewrite is enabled (contact GoDaddy support if needed)
- Check file permissions are set to 644

### Issue 3: HTTPS Redirect Not Working
- **Solution**: Comment out the HTTPS redirect lines in .htaccess until SSL is installed
```apache
# RewriteCond %{HTTPS} off
# RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### Issue 4: Mobile Menu Not Working
- **Solution**: Clear browser cache
- Check if main.js is loading correctly (view source, check Console)

### Issue 5: Neural Network Background Not Visible
- **Solution**: Check CSS opacity setting (currently 0.3)
- Verify main.js is loading and executing
- Check browser console for JavaScript errors

---

## Performance Optimization (Already Included)

✅ **Browser Caching** - Set via .htaccess
✅ **GZIP Compression** - Enabled in .htaccess
✅ **Image Optimization** - Consider compressing large images before upload
✅ **Minification** - Consider minifying CSS/JS for production (optional)

---

## Security Features (Already Included)

✅ **HTTPS Redirect** - Forces secure connection
✅ **Security Headers** - X-Frame-Options, X-Content-Type-Options, XSS Protection
✅ **Directory Browsing Disabled** - Prevents listing files
✅ **Hidden Files Protected** - .htaccess and other dot files secured

---

## Maintenance & Updates

### To Update Content:
1. Edit local files on your computer
2. Test changes locally at http://localhost:8000
3. Upload modified files via FTP or File Manager
4. Clear browser cache to see changes

### Regular Checks:
- Monthly: Check all links still work
- Quarterly: Update publications and research info
- Yearly: Review and update SSL certificate

---

## Support Contacts

- **GoDaddy Support**: 1-480-505-8877 or support.godaddy.com
- **cPanel Issues**: Access via GoDaddy hosting dashboard
- **DNS Propagation**: Can take 24-48 hours for changes

---

## Quick Commands Reference

### FTP Connection Info (Get from GoDaddy cPanel):
- **Host**: ftp.yourdomain.com
- **Username**: Your cPanel username
- **Password**: Your cPanel password
- **Port**: 21 (or 22 for SFTP)

### File Permission Commands (if using SSH):
```bash
# Set directory permissions
find /home/username/public_html -type d -exec chmod 755 {} \;

# Set file permissions
find /home/username/public_html -type f -exec chmod 644 {} \;
```

---

## Final Notes

1. **Backup**: Always keep a local backup of all files
2. **Testing**: Test thoroughly on multiple devices and browsers
3. **Analytics**: Consider adding Google Analytics to track visitors
4. **SEO**: Meta descriptions are already included for all pages
5. **Updates**: Keep research, publications, and contact info current

---

**Website Ready for Deployment! ✅**

If you encounter any issues during deployment, refer to GoDaddy's documentation or contact their support team.
