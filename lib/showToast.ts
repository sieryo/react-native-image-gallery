import Toast from "react-native-toast-message";

type ToastType = "success" | "error" | "info";

export const showToast = (type: ToastType, text1: string, text2?: string) => {
  let textColor;

  switch (type) {
    case "error":
      textColor = "#C40C0C";
      break;
    case "success":
      textColor = "#008000";
      break;
    case "info":
      textColor = "#0047AB";
      break;
    default:
      break;
  }
  Toast.show({
    type: type,
    text1,
    text2,
    text1Style: {
      color: textColor,
    },
  });
};
