import { useEffect, useState } from "react";
import { THEMES } from "../../Constant/data";
import { useThemeStore } from "../../store/useThemeStore";
import { motion } from "framer-motion";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-base-100 text-base-content pt-24 pb-16 px-4">
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col bg-base-200/60 p-4 rounded-xl border border-base-300 shadow-md h-fit">
          <h2 className="text-lg font-semibold mb-4">Settings</h2>
          <nav className="flex flex-col gap-2 text-sm font-medium">
            <button className="text-primary bg-primary/10 px-3 py-2 rounded-lg transition">
              Appearance
            </button>
            <button className="hover:text-primary hover:bg-base-300 px-3 py-2 rounded-lg transition">
              Notifications
            </button>
            <button className="hover:text-primary hover:bg-base-300 px-3 py-2 rounded-lg transition">
              Account
            </button>
            <button className="hover:text-primary hover:bg-base-300 px-3 py-2 rounded-lg transition">
              Privacy
            </button>
            <button className="hover:text-primary hover:bg-base-300 px-3 py-2 rounded-lg transition">
              Help & Feedback
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <div className="md:col-span-3 space-y-8">
          {/* Appearance Section */}
          <section className="p-6 bg-base-200/60 rounded-xl border border-base-300 shadow-md">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-1">Theme</h3>
              <p className="text-sm text-base-content/70">
                Choose a theme for your interface
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {THEMES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  aria-pressed={theme === t}
                  className={`group flex flex-col items-center gap-2 p-3 rounded-lg transition-all border ${
                    theme === t
                      ? "border-primary bg-primary/10"
                      : "hover:bg-base-300 border-transparent"
                  }`}
                >
                  <div
                    className="relative h-10 w-full rounded-md overflow-hidden shadow"
                    data-theme={t}
                  >
                    <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                      <div className="rounded bg-primary"></div>
                      <div className="rounded bg-secondary"></div>
                      <div className="rounded bg-accent"></div>
                      <div className="rounded bg-neutral"></div>
                    </div>
                  </div>
                  <span className="text-xs font-medium truncate w-full text-center capitalize">
                    {t}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Notification Settings */}
          <section className="p-6 bg-base-200/60 rounded-xl border border-base-300 shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">Enable Notifications</h3>
                <p className="text-sm text-base-content/70">
                  You’ll receive updates and alerts.
                </p>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled((prev) => !prev)}
              />
            </div>
          </section>

          {/* Privacy Settings */}
          <section className="p-6 bg-base-200/60 rounded-xl border border-base-300 shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">Privacy Mode</h3>
                <p className="text-sm text-base-content/70">
                  Hide online status and typing indicators.
                </p>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-accent"
                checked={privacyMode}
                onChange={() => setPrivacyMode((prev) => !prev)}
              />
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
