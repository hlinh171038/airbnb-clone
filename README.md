4.Modal UI
    - create Modal.tsx component
        - interface ( isOpen?, onClose, onsubmit, title, body,footer,actionLable( pass name of action ex 'submit'),secondaryActionLabel(like action label, disable))
        - useEffect (setShowModal(isOpen)) --> base on isOpen passing
        - handle close function --> useCallback -->check if(disabled return ) onClose() , settimeout to smoother
        - handle submit function ---> useCallback -->check if(disabled return ) onSubmit()
        - handle secondary function -->useCallback -->check if(disabled return ) secondaryAction();
        - if(!isOpen)  return null;

        - Button 
            interface (label, disabled, icon,onClick,small,outline )


