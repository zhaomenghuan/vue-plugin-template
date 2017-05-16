<template>
    <div id="app">
        hello {{msg}}!
    </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            msg: 'vue-plugin-template'
        }
    }
}
</script>