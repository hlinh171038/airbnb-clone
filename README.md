16.post to database (listing)
    -onSubmit
        use Submithandler<FieldValues> (react-hook-form) pass data take form rentdata
        - check steps is last step
        - isLoading --> false --> to prevent user click while submit button is clicked
        - axios ---Linh
            .then ()
                -toast so success
                - close rent model
                - refesh form 
                - reset( react-hook form) to update form again
                - setStep to first step again
            .catch
                - toast error
            .finally
                - isSetloading false
    - pass for onSubmit (Model)
    - api endpoint
        - check current user 
        - take body
        - use prisma to create new listing
        - return NextResoonse.json(listing)




            



