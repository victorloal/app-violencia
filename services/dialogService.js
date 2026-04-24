export const DialogService = {
  dialogRef: null,
  show: (title, message, buttons, icon) => {
    if (DialogService.dialogRef) {
      DialogService.dialogRef.showDialog(title, message, buttons, icon);
    } else {
      // Fallback for when context isn't ready
      import("react-native").then(({ Alert }) => {
        Alert.alert(title, message, buttons);
      });
    }
  },
  hide: () => {
    if (DialogService.dialogRef) {
      DialogService.dialogRef.hideDialog();
    }
  },
};
