# How to Build Your iOS App with GitHub Actions

This guide explains how to use the "Cloud Mac" method to build your PaperTrader app for iOS using GitHub Actions.

## Prerequisites
1.  **GitHub Repository**: Your code must be pushed to GitHub.
2.  **AltStore**: Installed on your Windows PC and iPhone.

## Steps

### 1. Push Code to GitHub
Ensure all your latest changes are pushed to your GitHub repository.
```bash
git add .
git commit -m "Ready for build"
git push
```

### 2. Trigger the Build
1.  Go to your repository on **GitHub.com**.
2.  Click the **Actions** tab at the top.
3.  On the left sidebar, click **Build iOS IPA**.
4.  Click the **Run workflow** button (dropdown) on the right.
5.  Click the green **Run workflow** button.

### 3. Wait for Build
The build process will take about **15-20 minutes**.
-   You can click on the running workflow to see the logs (it's cool to watch the "Cloud Mac" work!).

### 4. Download IPA
1.  Once the workflow finishes (green checkmark), click on it.
2.  Scroll down to the **Artifacts** section.
3.  Click **PaperTrader-IPA** to download the zip file.
4.  Extract the zip file to get `PaperTrader.ipa`.

### 5. Install with AltStore
1.  Connect your iPhone to your PC.
2.  Open **AltServer** on your PC.
3.  Hold `Shift` and click the AltServer icon in the taskbar -> **Sideload .ipa...** -> Select your iPhone.
4.  Select the `PaperTrader.ipa` file you downloaded.
5.  Enter your Apple ID credentials if asked.
6.  Wait for installation. The app will appear on your iPhone!

## Troubleshooting
-   **Build Failed?** Check the logs in the Actions tab.
-   **App Crashing?** Ensure you have "Developer Mode" enabled on your iPhone (Settings -> Privacy & Security -> Developer Mode).
