<style>

@import "bulma/css/bulma.css";

.card-container {
    width: 10rem;
    height: 10rem;
    position: relative;
}

.front, .back {

    position: absolute;
    top: 0;
    left: 0;
    backface-visibility: hidden;
    overflow: hidden;
    transition: transform .5s ease;
    width: 10rem;
    height: 10rem;

    box-sizing: border-box;
    padding: 2rem;
    border-radius: 4px;
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, .25);

    font-size: 1.2rem;
    color: #fff;
    text-align: center;
}

.front {
    background-image: linear-gradient(to right bottom, #2ecc71, #229955);
}

.back {
    transform: rotateX(180deg);
    background-image: linear-gradient(to right bottom, #f1c40f, #e67e22);
}

.card-container:hover .front {
    transform: rotateX(-180deg);
}

.card-container:hover .back {
    transform: rotateX(0deg);
}

</style>

<script lang="ts">

export let front: string
export let back: string

</script>

<div class="card-container">
    <div class="front">{front}</div>
    <div class="back">{back}</div>
</div>