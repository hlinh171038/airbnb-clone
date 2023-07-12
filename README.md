12. listing creation step 2( location setion)
    -create RentModel and hooks to open and close model( create in first step) (not)
    - check if ( steps === Location)
        1.need Selected (input folder) recive( value, onChange) 
            -useCountry hook (npm i wolrd-country)
        2.useCountries
            - countries.map () (data from world-country)
                -take value.cca2, label.common, religon, latlgn, flag
                -function getAll, getByValue --> use in SelectCountries.tsx
        3.SelectCountries.tsx
            - type country data (ts required)
            - interface (value:type country date, onChange)
            - use Selected (react-select npm)
                - placeholder, isClearable, options(getAll), themes to change default theme, value, onChange, formatOptionLabel
    


    -Map corresponse with select (npm i leaflet)
        -rentmodel.tsx () pass props coodinary (location?.latlng) 
            (but leaflet not support by react)
        - 





            



