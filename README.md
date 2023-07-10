8.category UI and qurery 
    - create category 
        - push list (icon, description,label) -->map (CategoryBox)
        - (CategoryBox) --> create url query
            - router(router/navigate)
            - params( from useSearchParams)
            - function handleClick ()
                - empty currentQuerry
                - upadate (..., categories : label)
                - check params is exist ( use query-string)
                - look throught params to check if params === label --> delete
                - create url  ( url, query: currentQuery )
                - router.push to url


            



