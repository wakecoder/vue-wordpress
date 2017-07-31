<template>
    <div>
        <slot v-if="!loaded && showSpinner" transition="fade" name="loading-content">
            <div class="loading-content-div">
                <div class="spinner"> </div>
            </div>
        </slot>
        <slot v-if="loaded" transition="fade">
        </slot>
        </div>
</template>
<style>
    loading-content-div {
        width: 100%;
        height: 100%;
    }
    
    .spinner {
        width: 40px;
        height: 40px;
        margin: 100px auto;
        background-color: #333;
        border-radius: 100%;
        -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;
        animation: sk-scaleout 1.0s infinite ease-in-out;
    }
    
    @-webkit-keyframes sk-scaleout {
        0% {
            -webkit-transform: scale(0)
        }
        100% {
            -webkit-transform: scale(1.0);
            opacity: 0;
        }
    }
    
    @keyframes sk-scaleout {
        0% {
            -webkit-transform: scale(0);
            transform: scale(0);
        }
        100% {
            -webkit-transform: scale(1.0);
            transform: scale(1.0);
            opacity: 0;
        }
    }
</style>
<script>
import 'whatwg-fetch'
export default {
    name: 'async-content',
    props: {
        loaded: undefined,
        showSpinner: {
            default: true
        }
    }
}
</script>
