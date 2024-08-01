<script>
    import ImageGrid from "./ImageGrid.svelte";
    let images = [
    'https://scontent.fhex5-2.fna.fbcdn.net/v/t39.30808-6/453007007_909219551232943_4806353232977117812_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=qBXgEWZrvEQQ7kNvgEsNxZw&_nc_ht=scontent.fhex5-2.fna&oh=00_AYCFE1a_9DO4382zi8TZm8iICW2Zi2I2fMcPD7IJb1FCfg&oe=66ACD1F9',
    'https://scontent.fhex5-1.fna.fbcdn.net/v/t39.30808-6/453062572_909218277899737_4033827574117945959_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=IDYgGXwtJiAQ7kNvgHfTbPs&_nc_ht=scontent.fhex5-1.fna&oh=00_AYAOZCabhX1CQLZBckneC0rDh6rCxEoYraciQnvbxauiAQ&oe=66ACCED3',
    'https://scontent.fhex5-2.fna.fbcdn.net/v/t39.30808-6/453012081_908664667955098_6067738936929298697_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=KHAmiKRKS_8Q7kNvgH3P4-w&_nc_ht=scontent.fhex5-2.fna&oh=00_AYBtnn3oOOZobWIDSLE9PESEbSlffps4xgVejvu0YrLgvQ&oe=66ACD3DE',
    'https://scontent.fhex5-2.fna.fbcdn.net/v/t39.30808-6/453014907_908664654621766_2803209995352530567_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=xg-Z2WMNQvcQ7kNvgGrM1T_&_nc_ht=scontent.fhex5-2.fna&oh=00_AYC3p7dcV6KAUIXauLmau2XaOAAPp5NXZzZ6HOG6XzYBLg&oe=66ACC586',
    'https://scontent.fhex5-2.fna.fbcdn.net/v/t39.30808-6/453012081_908664667955098_6067738936929298697_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=KHAmiKRKS_8Q7kNvgH3P4-w&_nc_ht=scontent.fhex5-2.fna&oh=00_AYBtnn3oOOZobWIDSLE9PESEbSlffps4xgVejvu0YrLgvQ&oe=66ACD3DE',
    'https://scontent.fhex5-2.fna.fbcdn.net/v/t39.30808-6/453014907_908664654621766_2803209995352530567_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=xg-Z2WMNQvcQ7kNvgGrM1T_&_nc_ht=scontent.fhex5-2.fna&oh=00_AYC3p7dcV6KAUIXauLmau2XaOAAPp5NXZzZ6HOG6XzYBLg&oe=66ACC586']
</script>
<div>
    <ImageGrid images={images}/>
</div>