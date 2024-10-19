<script lang="ts">
    import '../css/app.css'
    import '../css/loading.css'
    import '../js/title-bar'

    import {invoke} from "@tauri-apps/api/core";

    console.log("Loading application...")

    invoke('token_is_actual').then(
        value => {
            if (!value)
                navigation.navigate("/temperature")
            else
                navigation.navigate("/token")
        }
    )
</script>
<div class="container">
    <svg class="spinner" width="150px" height="150px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
    </svg>
</div>