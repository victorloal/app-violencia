import React, { createContext, useContext, useState, useEffect } from "react";
import CustomDialog from "../components/UI/CustomDialog";
import { DialogService } from "../services/dialogService";

const DialogContext = createContext({});

export const useDialog = () => useContext(DialogContext);

export const DialogProvider = ({ children }) => {
  const [dialogConfig, setDialogConfig] = useState({
    visible: false,
    title: "",
    message: "",
    buttons: [],
    Icon: null,
  });

  const showDialog = (title, message, buttons = [], Icon = null) => {
    setDialogConfig({
      visible: true,
      title,
      message,
      buttons,
      Icon,
    });
  };

  const hideDialog = () => {
    setDialogConfig((prev) => ({ ...prev, visible: false }));
  };

  useEffect(() => {
    DialogService.dialogRef = { showDialog, hideDialog };
  }, []);

  return (
    <DialogContext.Provider value={{ showDialog, hideDialog }}>
      {children}
      <CustomDialog
        visible={dialogConfig.visible}
        title={dialogConfig.title}
        message={dialogConfig.message}
        buttons={dialogConfig.buttons}
        Icon={dialogConfig.Icon}
        onClose={hideDialog}
      />
    </DialogContext.Provider>
  );
};
