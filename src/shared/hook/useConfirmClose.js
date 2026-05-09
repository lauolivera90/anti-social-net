export const useConfirmClose = (formData, initialData, handleClose, cleanInputs) => {
  const confirmClose = () => {
    // Verificamos si algún valor actual es distinto al inicial
    const isDirty = Object.keys(formData).some(key => formData[key] !== initialData[key]);

    if (isDirty) {
      const confirmExit = window.confirm("Hay cambios sin guardar. ¿Estás seguro de que quieres salir?");
      if (!confirmExit) return;
    }
    
    cleanInputs();
    handleClose();
  };

  return confirmClose;
};