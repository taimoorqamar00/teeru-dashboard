const getActiveKeys = (normalizedPath: string): string[] => {
  if (normalizedPath.includes("/leagues-&-match-oversight/")) {
    return ["leagues-&-match-oversight"];
  }
  if (normalizedPath.includes("/edit-profile")) {
    return ["profile"];
  }
  if (normalizedPath.includes("/change-password")) {
    return ["change-password"];
  }
  if (normalizedPath.includes("/privacy-policy")) {
    return ["privacy-policy"];
  }
  if (normalizedPath.includes("/add-feedback")) {
    return ["add-feedback"];
  }
  if (normalizedPath.includes("/show-feedback")) {
    return ["show-feedback"];
  }
  if (normalizedPath.includes("/terms-and-condition")) {
    return ["terms-and-condition"];
  }

  return [normalizedPath.split("/").pop() || ""]; // Default fallback, ensuring a non-null value is returned
};

export default getActiveKeys;
