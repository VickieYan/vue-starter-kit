<template>
    <div>
        Father
        <Son @enlarge-text="receiveMsg"/>
    </div>
</template>
<script>
import Son from './Son'
export default {
    components: { Son },
    methods: {
        receiveMsg(num) {
            alert(num)
        }
    }
}
</script>

