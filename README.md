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
    - create hook register 
        - npm i zutash
        - recive isOpen, onClose,onOpen
        - use method set of zutash

    - create Register Model (create hook to use for register model)
        - import to layout.tsx
       
        - axios to post data to server
        - react-hook-form to validate form
        - useRegister hook to open and close register block
         - use Modal.tsx
            - disabled={isLoading}   // 
            - isOpen={registerModal.isOpen} 
            - title='Register'
            - actionLabel='Continue'
            - onClose={registerModal.onClose}
            - onSubmit={handleSubmit(onSubmit)}
            - body={bodyContent} // create 
            - footer={Footers} // create
    - use toast to show error
        - create provider use whole app
        - wrap to layout.tsx
        - use in ResgisterModal.tsx to catch err

