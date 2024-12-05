document.getElementById("toggle").addEventListener("click", async () => {
    const isActive = await chrome.storage.local.get("autoGroupActive");
    const newValue = !isActive.autoGroupActive;
  
    await chrome.storage.local.set({ autoGroupActive: newValue });
    alert(`Auto Group est maintenant ${newValue ? "activé" : "désactivé"}`);
  });
  