<script lang="ts">
    import '../../css/svetle.css'
    import '../../css/app.css'
    import './css/circular.css'
    import './css/temperature.css'
    import '../../js/title-bar'

    import {invoke} from "@tauri-apps/api/core";
    import {loadBar, fillSensors} from '../../js/circular-bar'

    let cpu =
        {
            min: "0",
            avg: "0",
            max: "0"
        };
    let gpu =
        {
            min: "0",
            avg: "0",
            max: "0"
        };

    setInterval(() => {
        invoke("get_computer_data")
            .then(
                value => {
                    cpu = value.cpu;
                    gpu = value.gpu;
                }
            )
            .then(setTimeout(100))
            .then(fillSensors())
    }, 1000);

    function refreshPage() {
        window.location.reload();
    }
</script>
<div class="container">
    <div class="sensors">
        <div class="circular-container">
            <div class="label">CPU</div>
            <div class="circular">
                <div class="circle" id="cpu-circle">
                    <div class="bar bar-right" id="cpu-circle-bar-right">
                        <div class="progress progress-right" id="cpu-circle-bar-right-progress"></div>
                    </div>
                    <div class="bar bar-left" id="cpu-circle-bar-left">
                        <div class="progress progress-left" id="cpu-circle-bar-left-progress"></div>
                    </div>
                </div>
            </div>
            <div class="content" id="cpu-content">
                <span id="cpu-avg">{cpu.avg}</span>℃
            </div>
        </div>
        <div class="circular-container">
            <div class="label">GPU</div>
            <div class="circular">
                <div class="circle" id="gpu-circle">
                    <div class="bar bar-right" id="gpu-circle-bar-right">
                        <div class="progress progress-right" id="gpu-circle-bar-right-progress"></div>
                    </div>
                    <div class="bar bar-left" id="gpu-circle-bar-left">
                        <div class="progress progress-left" id="gpu-circle-bar-left-progress"></div>
                    </div>
                </div>
            </div>
            <div class="content" id="gpu-content">
                <span id="gpu-avg">{gpu.avg}</span>℃
            </div>
        </div>
    </div>
    <div class="panel">
        <!-- <div class="panel-alarm">
            <a href="/cpu">
                <button class="cpu-alarm-button">
                    Alarm CPU
                </button>
            </a>
            <a href="/gpu">
                <button class="cpu-alarm-button">
                    Alarm GPU
                </button>
            </a>
        </div> -->
        <div class="panel-buttons">
            <a href="/token">
                <button class="token-button">
                    Change Token
                </button>
            </a>
            <button class="refresh-button" on:click={refreshPage}>
                Refresh Page
            </button>
        </div>
    </div>
</div>