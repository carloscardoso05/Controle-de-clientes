<template>
	<dialog id="modal" class="border-2 border-red-500 rounded absolute top-1/4">
		<form method="dialog">
			<p>
				<label>Favorite animal:
					<select>
						<option value="default">Choose…</option>
						<option>Brine shrimp</option>
						<option>Red panda</option>
						<option>Spider monkey</option>
					</select>
				</label>
			</p>
			<div>
				<button value="cancel">Cancel</button>
				<button id="confirmBtn" value="default">Confirm</button>
			</div>
		</form>
	</dialog>
</template>

<script lang="ts" setup>

</script>