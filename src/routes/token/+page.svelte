<script lang="ts">
    import '../../css/svetle.css'
    import '../../css/app.css'
    import './css/token.css'
    import '../../js/title-bar'

    import {invoke} from "@tauri-apps/api/core";

    let token = "";
    let message = "";

    async function token_save() {
        // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
        //message = await invoke("token_save", { token });

        navigation.navigate('/temperature');
    }
</script>
<div class="container">
    <p>Token</p>
    <form class="row" on:submit|preventDefault={token_save}>
        <input id="token-input" placeholder="Enter a token of bot" bind:value={token}/>
        <button type="submit">Save</button>
    </form>

    <p>{message}</p>
</div>