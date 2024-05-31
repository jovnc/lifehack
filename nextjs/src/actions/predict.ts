"use server";

export const predict = async (ingredients: string[]) => {
  const response = await fetch("http://127.0.0.1:5000/api/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ingredients),
  });

  if (!response.ok) {
    return {
      success: false,
      message:
        "Failed to predict ingredients. Make sure Flask server is running.",
    };
  }

  const data = await response.json();
  return {
    success: true,
    data: data,
  };
};
