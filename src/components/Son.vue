<template>
    <div>
        Son
        <button v-on:click="$emit('enlarge-text', 6)">
            Enlarge text
        </button>
    </div>
</template>
